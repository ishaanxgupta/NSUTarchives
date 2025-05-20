package websocket

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Room stores clients, current code, and participant names
type Room struct {
	Clients      map[*websocket.Conn]bool
	Participants map[*websocket.Conn]string
	Code         string
	Mutex        sync.Mutex
}

var rooms = make(map[string]*Room)
var roomsMutex sync.Mutex

type Message struct {
	Type    string `json:"type"`    // "code" or other types
	Content string `json:"content"` // code or chat content
}

func WebsocketHandler(c *gin.Context) {
	roomID := c.Query("room")
	userName := c.Query("name")
	if roomID == "" || userName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing room ID or name"})
		return
	}

	// Get or create room
	roomsMutex.Lock()
	if _, exists := rooms[roomID]; !exists {
		rooms[roomID] = &Room{
			Clients:      make(map[*websocket.Conn]bool),
			Participants: make(map[*websocket.Conn]string),
			Code:         "",
		}
		log.Printf("Created room %s", roomID)
	}
	room := rooms[roomID]
	roomsMutex.Unlock()

	// Upgrade connection
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	room.Mutex.Lock()
	if len(room.Clients) >= 6 {
		room.Mutex.Unlock()
		conn.Close()
		log.Printf("Room %s is full", roomID)
		return
	}

	room.Clients[conn] = true
	room.Participants[conn] = userName
	log.Printf("%s joined room %s", userName, roomID)

	// Send current code to new client
	if room.Code != "" {
		initialCodeMsg := Message{
			Type:    "code",
			Content: room.Code,
		}
		msgBytes, _ := json.Marshal(initialCodeMsg)
		conn.WriteMessage(websocket.TextMessage, msgBytes)
	}

	// Send updated participant list
	broadcastParticipants(room)

	room.Mutex.Unlock()

	// Handle messages
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			room.Mutex.Lock()
			delete(room.Clients, conn)
			delete(room.Participants, conn)
			log.Printf("%s left room %s", userName, roomID)

			if len(room.Clients) == 0 {
				roomsMutex.Lock()
				delete(rooms, roomID)
				roomsMutex.Unlock()
				log.Printf("Deleted empty room %s", roomID)
			} else {
				broadcastParticipants(room)
			}

			room.Mutex.Unlock()
			break
		}

		var incoming Message
		if err := json.Unmarshal(message, &incoming); err != nil {
			log.Println("Invalid JSON from client")
			continue
		}

		if incoming.Type == "code" {
			room.Mutex.Lock()
			room.Code = incoming.Content

			// Broadcast code update
			outgoing, _ := json.Marshal(incoming)
			for client := range room.Clients {
				if client != conn {
					client.WriteMessage(websocket.TextMessage, outgoing)
				}
			}
			room.Mutex.Unlock()
		}
	}
}

func broadcastParticipants(room *Room) {
	names := []string{}
	for _, name := range room.Participants {
		names = append(names, name)
	}
	msg := map[string]interface{}{
		"type":  "participants",
		"names": names,
	}
	messageBytes, _ := json.Marshal(msg)

	for client := range room.Clients {
		err := client.WriteMessage(websocket.TextMessage, messageBytes)
		if err != nil {
			log.Println("Error broadcasting participants:", err)
		}
	}
}

// backend/main.go
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/pranshulakhotia/nsutarchives-backend/websocket"
)

func main() {
	router := gin.Default()

	router.GET("/ws", websocket.WebsocketHandler)

	router.Run(":8080") // Runs on http://localhost:8080
}

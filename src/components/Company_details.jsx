
import React from "react";
import { useParams } from "react-router-dom";
import posts from "../data/posts.json";
import company_details from "../data/company_details.json";
import { Container, Typography, Box, Card, CardMedia, CardContent, Accordion, AccordionSummary, AccordionDetails, Button, Divider  } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function DetailsPage() {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  const company_detail = company_details.find((company_detail) => company_detail.id === parseInt(id));
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="bg-teal-900 min-h-screen flex items-center justify-center">
      <Container maxWidth="md" className="mt-8">
        <Card className="shadow-lg bg-white">
          {/* Company Logo */}
          <CardMedia
            component="img"
            alt={post.username}
            image={company_detail.photo}  
          />

          {/* General Information */}
          <CardContent>
            <Typography variant="h4" component="h2" className="text-center font-bold text-blue-800">
              {post.username}
            </Typography>
            <Box className="mt-4">
              <Typography variant="body1" className="text-gray-700">
                <strong>Category:</strong> {post.category}
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                <strong>Location:</strong> {post.location}
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                <strong>CGPA Criteria:</strong> {post.CGPA_criteria}
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                <strong>Backlogs:</strong> {post.backlogs}
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                <strong>Branches Allowed:</strong> {post.branches}
              </Typography>
            </Box>

            {/* Details of Test */}
            <Box className="mt-6">
            <Typography variant="h5" component="h3" className="font-semibold text-green-700">
                Online Test Details
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-2">
                <strong>General Info:</strong> {company_detail.message}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-2">
                <strong>Pattern:</strong> {company_detail.details_of_test}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-1">
                <strong>Time:</strong> {company_detail.time_for_test}
              </Typography>

             <Box
              sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              marginTop: 2
              }}
              >

      {company_detail.questions?.map((question, index) => (
      <Card key={index} className="shadow-md">
      <CardContent style={{ display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
      {/* Question title */}
      <Typography variant="h7" component="h2" className="text-gray-800" style={{ flexGrow: 1 }}>
        {question.title}
      </Typography>

      {/* Divider - fixed position between title and button */}
      <Divider style={{ margin: '20px 0' }} />

      {/* Solve button at the bottom */}
      <Box display="flex" justifyContent="center" mt="auto">
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert(`Solving: ${question.title}`)}
        >
          Solve
        </Button>
      </Box>
    </CardContent>
  </Card>
))}
  </Box>
</Box>
            <br></br>
            {/* Interview Section */}
            <Typography variant="h5" component="h3" className="font-semibold text-green-700">
        Interview Experiences
            </Typography>
            <div className="mt-2 text-gray-600">
            {company_detail.interview_experiences.map((experience, index) => (
            <Accordion key={index} className="mt-4">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="body1" className="font-bold text-blue-800">
                Experience {index + 1}
              </Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-gray-100">
              {experience.rounds.map((round, rIndex) => (
                <div key={rIndex} className="mb-4">
                  <Typography variant="h6" className="text-gray-700 mb-2">
                    {round.round_name}
                  </Typography>
                  <ul className="list-disc pl-5 mt-2">
                    {round.questions.map((question, qIndex) => (
                       <li key={qIndex} className="flex items-start justify-between mb-2">
                        {isValidURL(question) ? (
                           <a href={question} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                             {question}
                           </a>
                                 ) : (
                        <Typography variant="body2" className="text-gray-600">
                          {question}
                        </Typography>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => alert(`Looks like you are very eager to solve this question. Hold back we'r building on the section`)}
                        >
                          Solve
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {rIndex < experience.rounds.length - 1 && <Divider />}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default DetailsPage;


// import React from "react";
// import { useParams } from "react-router-dom";
// import posts from "../data/posts.json";
// import company_details from "../data/company_details.json";
// import { Container, Typography, Card, CardContent, CardMedia, Grid, Box } from "@mui/material";

// function DetailsPage() {
//   const { id } = useParams();
//   const post = posts.find((post) => post.id === parseInt(id));
//   const company_detail = company_details.find((company_detail) => company_detail.id === parseInt(id));

//   return (
//     <Container maxWidth="md" className="mt-8">
//       {/* Company Logo and Name */}
//       <Card>
//         <CardMedia
//           component="img"
//           height="2"
//           image={post.logo} // Assuming `post.logo` contains the image path
//           alt={post.username}
//         />
//         <CardContent>
//           <Typography variant="h4" component="h2" className="font-bold text-center">
//             {post.username}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* General Information */}
//       <Box mt={4}>
//         <Typography variant="h5" component="h3" className="font-semibold">
//           General Information
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           Location: {post.location}
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           CGPA Criteria: {post.CGPA_criteria}
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           Backlogs: {post.backlogs}
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           Eligible Branches: {post.branches}
//         </Typography>
//       </Box>

//       {/* Online Test Details */}
//       <Box mt={4}>
//         <Typography variant="h5" component="h3" className="font-semibold">
//           Online Test Details
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           {company_detail.details_of_test}
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           Duration: {company_detail.time_for_test}
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           {company_detail.message.map((msg, index) => (
//             <span key={index}>{msg}<br/></span>
//           ))}
//         </Typography>
//       </Box>

//       {/* Photos of Test Questions */}
//       <Box mt={4}>
//         <Typography variant="h5" component="h3" className="font-semibold">
//           Photos of Test Questions
//         </Typography>
//         <Grid container spacing={2}>
//           {company_detail.photos_of_tests && company_detail.photos_of_tests.length > 0 ? (
//             company_detail.photos_of_tests.map((photo, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={photo} // Assuming each `photo` is a path to an image
//                     alt={`Test question ${index + 1}`}
//                   />
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               No photos available.
//             </Typography>
//           )}
//         </Grid>
//       </Box>

//       {/* Interview Experience */}
//       <Box mt={4} mb={8}>
//         <Typography variant="h5" component="h3" className="font-semibold">
//           Interview Experience
//         </Typography>
//         <Typography variant="body1" color="textSecondary" paragraph>
//           {/* Replace with dynamic content if needed */}
//           Interview experiences and questions will go here.
//         </Typography>
//       </Box>
//     </Container>
//   );
// }

// export default DetailsPage;


// import React from "react";
// import { useParams } from "react-router-dom";
// import posts from "../data/posts.json";
// import company_details from "../data/company_details.json";
// import { Container, Typography, Box, Card, CardMedia, CardContent } from "@mui/material";

// function DetailsPage() {
//   const { id } = useParams();
//   const post = posts.find((post) => post.id === parseInt(id));
//   const company_detail = company_details.find((company_detail) => company_detail.id === parseInt(id));

//   return (
//     <div className="bg-teal-900">
//     <Container maxWidth="md" className="mt-8">
//       <Card className="shadow-lg">
//         {/* Company Logo */}
//         <CardMedia
//           component="img"
//           alt={post.username}
//           height="40"
//           image={company_details.photo}  
//           className="object-contain"
//         />

//         {/* General Information */}
//         <CardContent>
//           <Typography variant="h4" component="h2" className="text-center font-bold text-blue-800">
//             {post.username}
//           </Typography>
//           <Box className="mt-4">
//             <Typography variant="body1" className="text-gray-700">
//               <strong>Category:</strong> {post.category}
//             </Typography>
//             <Typography variant="body1" className="text-gray-700">
//               <strong>Location:</strong> {post.location}
//             </Typography>
//             <Typography variant="body1" className="text-gray-700">
//               <strong>CGPA Criteria:</strong> {post.CGPA_criteria}
//             </Typography>
//             <Typography variant="body1" className="text-gray-700">
//               <strong>Backlogs:</strong> {post.backlogs}
//             </Typography>
//             <Typography variant="body1" className="text-gray-700">
//               <strong>Branches Allowed:</strong> {post.branches}
//             </Typography>
//           </Box>

//           {/* Details of Test */}
//           <Box className="mt-6">
//             <Typography variant="h5" component="h3" className="font-semibold text-green-700">
//               Online Test Details
//             </Typography>
//             <Typography variant="body2" className="text-gray-600 mt-2">
//               {company_detail.details_of_test}
//             </Typography>
//             <Typography variant="body2" className="text-gray-600 mt-1">
//               <strong>Time:</strong> {company_detail.time_for_test}
//             </Typography>
//           </Box>

//           {/* Photos of Test
//            <Box className="mt-6">
//             <Typography variant="h5" component="h3" className="font-semibold text-green-700">
//               Photos of the Test
//             </Typography>
//             <div className="grid grid-cols-2 gap-4 mt-2">
//               {company_detail.photos_of_tests.map((photo, index) => (
//                 <img key={index} src={photo} alt={`Test ${index + 1}`} className="w-full h-auto rounded-lg" />
//               ))}
//             </div>
//           </Box> */}

//           {/* Interview Section */}
//           <Box className="mt-6">
//             <Typography variant="h5" component="h3" className="font-semibold text-green-700">
//               Interview Experiences
//             </Typography>
//             <div className="mt-2 text-gray-600">
//               {company_detail.interview_experiences.map((experience, index) => (
//                 <Box key={index} className="mt-4 p-4 border rounded-lg">
//                   <Typography variant="body1" className="font-bold text-blue-800">
//                     {experience.round}
//                   </Typography>
//                   <ul className="list-disc list-inside mt-2">
//                     {experience.questions.map((question, qIndex) => (
//                       <li key={qIndex}>
//                         <Typography variant="body2" className="text-gray-600">
//                           {question}
//                         </Typography>
//                       </li>
//                     ))}
//                   </ul>
//                 </Box>
//               ))}
//             </div>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//     </div>
//   );
// }

// export default DetailsPage;

import React from "react";
import { useParams } from "react-router-dom";
import posts from "../data/posts.json";
import company_details from "../data/company_details.json";
import { Container, Typography, Box, Card, CardMedia, CardContent } from "@mui/material";

function DetailsPage() {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));
  const company_detail = company_details.find((company_detail) => company_detail.id === parseInt(id));

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
                {company_detail.details_of_test}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-1">
                <strong>Time:</strong> {company_detail.time_for_test}
              </Typography>
            </Box>

            {/* Interview Section */}
            <Box className="mt-6">
              <Typography variant="h5" component="h3" className="font-semibold text-green-700">
                Interview Experiences
              </Typography>
              <div className="mt-2 text-gray-600">
                {company_detail.interview_experiences.map((experience, index) => (
                  <Box key={index} className="mt-4 p-4 border rounded-lg bg-gray-100">
                    <Typography variant="body1" className="font-bold text-blue-800">
                      {experience.round}
                    </Typography>
                    <ul className="list-disc pl-5 mt-2">
                      {experience.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start">
                          <Typography variant="body2" className="text-gray-600">
                            <ul class="list-disc">
                             <li>{question}</li> 
                              </ul>
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                ))}
              </div>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default DetailsPage;


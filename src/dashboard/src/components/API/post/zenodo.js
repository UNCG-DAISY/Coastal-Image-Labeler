//import React, { Component } from "react";
//import axios from "axios";
//import { Formik } from "formik";
//import * as FormData from "form-data";
//import * as yup from "yup";
//import { Form, Button, Alert, Spinner } from "react-bootstrap";

// let schema = yup.object().shape({
//   title: yup.string().required(),
//   description: yup.string().required()
// });

// export default class Zenodo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSuccess: false,
//       link: "",
//       doiNo: "",
//       API_URL: "https://zenodo.org/api",
//       ACCESS_TOKEN: ""
//     };
//   }

//   render() {
//     var that = this;
//     return (
//       <Formik
//         initialValues={{
//           title: "",
//           description: "",
//           file: ""
//         }}
//         // taking values from UI
//         validationSchema={schema}
//         onSubmit={(values, { setSubmitting, resetForm }) => {
//           console.log(values);
//           var data = JSON.stringify({
//             metadata: {
//               title: values.title,
//               upload_type: "dataset",
//               description: values.description,
//               creators: [{ name: "ashok", affiliation: "project" }]
//             }
//           });
//           //uploading data to zenodo
//           var config = {
//             method: "post",
//             url:
//               that.state.API_URL +
//               "/deposit/depositions?access_token=O9NW3AfL7n2lzAGPgSLMQmKyqtDAOAO1QmC9sNLtMhx0qKqf4H5oI3hLzBa5" +
//               that.state.ACCESS_TOKEN,
//             headers: {
//               "Content-Type": "application/json"
//             },
//             data: data
//           };
// // collecting thatuploaded data details
//           axios(config)
//             .then(function(response) {
//               console.log(JSON.stringify(response.data));
//               var data = new FormData();
//               data.append("file", values.file);
// // publishing
//               var config = {
//                 method: "post",
//                 url:
//                   that.state.API_URL +
//                   "/deposit/depositions/" +
//                   response.data.id +
//                   "/files?access_token=O9NW3AfL7n2lzAGPgSLMQmKyqtDAOAO1QmC9sNLtMhx0qKqf4H5oI3hLzBa5" +
//                   that.state.ACCESS_TOKEN,
//                 headers: {
//                   "Content-Type": "multipart/form-data"
//                 },
//                 data: data
//               };

//               axios(config).then(function(finalResponse) {
//                 console.log(JSON.stringify(finalResponse.data));
//                 var config = {
//                   method: "post",
//                   url:
//                     that.state.API_URL +
//                     "/deposit/depositions/" +
//                     response.data.id +
//                     "/actions/publish?access_token=O9NW3AfL7n2lzAGPgSLMQmKyqtDAOAO1QmC9sNLtMhx0qKqf4H5oI3hLzBa5" +
//                     that.state.ACCESS_TOKEN
//                 };
//                 axios(config).then(function(responseData) {
//                   setSubmitting(false);
//                   that.setState({
//                     isSuccess: true,
//                     link: responseData.data.links.latest_html,
//                     doiNo: response.data.id
//                   });
//                   resetForm();
//                 });
//               });
//             })
//             .catch(function(error) {
//               console.log(error);
//               setSubmitting(false);
//             });
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//           setFieldValue
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Title:</Form.Label>
//               <Form.Control
//                 id="title"
//                 type="text"
//                 placeholder="Enter title"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.title}
//               />
//             </Form.Group>
//             {errors.title && touched.title && (
//               <Alert variant="danger">{errors.title}</Alert>
//             )}
//             <Form.Group>
//               <Form.Label>Description:</Form.Label>
//               <Form.Control
//                 id="description"
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter descr"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.description}
//               />
//             </Form.Group>
//             {errors.description && touched.description && (
//               <Alert variant="danger">{errors.description}</Alert>
//             )}
//             <Form.Group>
//               <Form.Label>File:</Form.Label>
//               <Form.Control
//                 id="file"
//                 type="file"
//                 placeholder="Select file"
//                 onChange={event => {
//                   setFieldValue("file", event.currentTarget.files[0]);
//                 }}
//               />
//             </Form.Group>
//             {errors.file && touched.file && (
//               <Alert variant="danger">{errors.file}</Alert>
//             )}
//             {isSubmitting && (
//               <Spinner animation="border" role="status">
//                 <span className="sr-only">Loading...</span>
//               </Spinner>
//             )}
//             {!isSubmitting && (
//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             )}
//             {this.state.isSuccess && (
//               <Alert variant="primary">
//                 <p>Doi No: {this.state.doiNo}</p>
//                 <p>
//                   Link:{" "}
//                   <a href={this.state.link} target="_blank">
//                     {this.state.link}
//                   </a>
//                 </p>
//               </Alert>
//             )}
//           </Form>
//         )}
//       </Formik>
//     );
//   }
// }

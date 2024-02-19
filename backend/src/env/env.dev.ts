class EnvDev implements EnvironmentVariable {
  baseUrl: string = "localhost";
  resetLinkBaseUrl: string = "http://localhost:3000";

  mondoDbUrl: string =
    "mongodb+srv://gurpratap:gurpratap@attendancecluster.yctfvwb.mongodb.net/?retryWrites=true&w=majority";
  jwtSecret: string = "$2a$10$dfdfd.DLOZ3pV62soZdS";
  headerKey: string = "authorization";
  senderEmail: string = "kakarott.priyanshu@gmail.com";
  senderPassword: string = "idvbistwzqmcugih";
}

export default new EnvDev();

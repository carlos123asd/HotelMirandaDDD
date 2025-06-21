import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación API Hotel Miranda',
      version: '1.0.0',
      description: 'Documentación generada con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/http/routes/*.ts']
};

export const swaggerObj = swaggerJSDoc(options);

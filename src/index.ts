import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

const swaggerOptions = {
    definition: {
            openapi: "3.0.0",
            info: {
            title: "Fargate API",
            version: "1.0.0",
            description: "Simple API with /ping and Swagger documentation",
        },
    },
    apis: ["./src/index.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping endpoint
 *     description: Retorna un mensaje "pong".
 *     responses:
 *       200:
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

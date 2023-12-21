"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: false,
        contentSecurityPolicy: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CSBlogs APIs')
        .setDescription('Testing CSBlogs API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('test_api', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map
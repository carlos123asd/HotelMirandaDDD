"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenerarCodigoEmpleado_1 = require("../../../../contexts/administrativo/aplicacion/servicios-de-dominio/GenerarCodigoEmpleado");
describe("Generar Codigo Empleado", () => {
    it("deberia generar un codigo con la combinacion de su email y telefono", () => {
        const codigo = (0, GenerarCodigoEmpleado_1.GenerarCodigoEmpleado)("empleado@ejemplo.com", "123456789");
        expect(codigo).toBe("empleado6789");
    });
});

const { Op } = require("sequelize");
const { Consulta, Beneficiario } = require(`../models`);

/**
 * Nombre: Pamela Nicole Barrientos Cruz
 * Carnet: BC21009
 * Estado: En proceso
 * Fecha de creación: 4/11/2022
 * Fecha de última edición: 4/11/2022
 * Fecha de última revisión:
 * Fecha de aprobación: 
 */

//Funcion para ver las consultas
async function listaConsultasFichaNutricion(request, response) {
    let dato = {}
    const id = request.params.id;
    //Probando consulta
    try {
        //Se recuperarán todos los beneficiarios
        const beneficiarios = await Beneficiario.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: {
                    [Op.eq]: id
                }

            },
            include: {
                where:{
                    'fichaId': 2
                },
                model: Consulta,
                as: 'consultas'
            }
        })
        dato = beneficiarios;
    } catch (error) {
        dato = {
            'message': "Datos incorrectos",
            "error": error.message
        }
    }
    return response.json(dato);
}

module.exports = {
    listaConsultasFichaNutricion
};
/** @interface cardDTO Implementa dados basicos para validar cartao */
interface cardDTO {
    /** BIN no formato XXXX XXXX XXXX XXXX, pode ter de 12 a 16 caracteres */
    number: string,
    month: number,
    year: number,
    cvv: number,
}

export default cardDTO;

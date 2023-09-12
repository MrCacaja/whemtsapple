export const VALIDATION_ERRORS: {[error: string]: string} = {
    required: 'Campo obrigatório',
    email: 'E-mail inválido',
    minlength: 'Mínimo {{actualLength}}/{{requiredLength}} caracteres',
    maxlength: 'Máximo {{actualLength}}/{{requiredLength}} caracteres',
    equalField: 'Deve ser igual ao campo "{{fieldName}}"',
}
export function validate(patient) {
  let error = 0;
  patient.hasOwnProperty("name") ? (error = 10) : null;
  patient.hasOwnProperty("cpf") ? (error = 10) : null;
  patient.hasOwnProperty("address") ? (error = 10) : null;
  patient.hasOwnProperty("id") ? (error = 10) : null;
  patient.hasOwnProperty("cellphone") ? (error = 10) : null;

  if (error === 10) {
    return false;
  }
}

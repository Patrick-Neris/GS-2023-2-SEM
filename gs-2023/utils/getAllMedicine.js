export function getAllMedicine(cpf) {
  const medicines = localStorage.getItem(`m-${cpf}`);
  if (!!medicines) {
    return JSON.parse(medicines);
  }
  return;
}

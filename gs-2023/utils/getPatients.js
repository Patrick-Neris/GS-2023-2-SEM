export function getPatients() {
  const patients = [];
  const keys = Object.keys(localStorage);

  // Removendo objeto do próprio expo
  const index = keys.indexOf("EXPO_CONSTANTS_INSTALLATION_ID");
  if (index > -1) keys.splice(index, 1);

  for (const key of keys) {
    let item = localStorage.getItem(key);
    item = JSON.parse(item);
    if (item.type === "patient") {
      patients.push({
        name: item.name,
        cpf: item.cpf,
      });
    }
  }
  return patients;
}

export function populateLocalStorage() {
  localStorage.setItem(
    "65335182083",
    JSON.stringify({
      address: "rua azul",
      age: "57",
      cellphone: "99999999999",
      cpf: "65335182083",
      name: "João da Silva",
      type: "patient",
    })
  );
  localStorage.setItem(
    "m-65335182083",
    JSON.stringify([
      {
        cpf: "65335182083",
        initDate: "30/11/2023 às 08h30.",
        medication: "Ibuprofeno",
        name: "João da Silva",
        text: "Tomar 2 comprimido(s) a cada 1 hora(s) por 2 semana(s).",
      },
      {
        cpf: "65335182083",
        initDate: "30/11/2023 às 08h30.",
        medication: "Dipirona",
        name: "João da Silva",
        text: "Tomar 5 ml a cada 1 dia(s) por 1 mês(es).",
      },
    ])
  );
  localStorage.setItem(
    "43542940011",
    JSON.stringify({
      address: "rua amarelo",
      age: "65",
      cellphone: "88888888888",
      cpf: "43542940011",
      name: "Maria José",
      type: "patient",
    })
  );
  localStorage.setItem(
    "76784644018",
    JSON.stringify({
      address: "rua laranja",
      age: "81",
      cellphone: "11111111111",
      cpf: "76784644018",
      name: "Joaquim",
      type: "patient",
    })
  );
  localStorage.setItem(
    "m-76784644018",
    JSON.stringify([
      {
        cpf: "76784644018",
        initDate: "30/11/2023 às 08h30.",
        medication: "Dipirona",
        name: "Joaquim",
        text: "Tomar 10 ml a cada 3 hora(s) por 4 dia(s).",
      },
    ])
  );
  return true;
}

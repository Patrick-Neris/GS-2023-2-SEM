export function validate(obj) {
  if (!objectNotNull(obj)) {
    console.log(obj);
    return {
      validated: false,
      error: "Preencha todos os campos.",
    };
  }

  if (obj.type == "patient") {
    // Validações para pacientes

    if (!onlyNumbers(obj.cellphone)) {
      return {
        validated: false,
        error: "Coloque somente números no telefone.",
      };
    }

    if (!onlyNumbers(obj.age)) {
      return {
        validated: false,
        error: "Coloque somente números na idade.",
      };
    }

    if (!onlyNumbers(obj.cpf)) {
      return {
        validated: false,
        error: "Coloque somente números no CPF.",
      };
    }

    if (!validateCpf(obj.cpf)) {
      return {
        validated: false,
        error: "CPF inválido.",
      };
    }

    if (alreadyExists(obj.cpf)) {
      return {
        validated: false,
        error: "CPF já cadastrado.",
      };
    }
  } else if (obj.type == "medication") {
    // Validações para medicamento

    const actualDate = new Date();
    const today = `${actualDate.getDate()}/${actualDate.getMonth()}/${actualDate.getFullYear()}`;

    if (obj.formatedDate <= today) {
      return {
        validated: false,
        error: "Data têm de ser de hoje ou superior",
      };
    }

    if (!onlyNumbers(obj.quantity)) {
      return {
        validated: false,
        error: "Quantidade de medicamento têm de ser um número.",
      };
    }

    if (!onlyNumbers(obj.period)) {
      return {
        validated: false,
        error: "Período de tratamento têm de ser um número.",
      };
    }

    if (!onlyNumbers(obj.interval)) {
      return {
        validated: false,
        error: "Intervalo de consumo têm de ser um número.",
      };
    }

    console.log(alreadyHasMedication(obj.cpf, obj.medication));
    if (alreadyHasMedication(obj.cpf, obj.medication)) {
      return {
        validated: false,
        error:
          "Medicamento já cadastrado para o paciente, favor revisar na tela de acompanhamento.",
      };
    }
  }
  return {
    validated: true,
    error: "",
  };
}

// Funções de apoio

function objectNotNull(object) {
  return Object.keys(object).every(
    (key) =>
      object[key] !== null && object[key] !== undefined && object[key] !== ""
  );
}

function onlyNumbers(variable) {
  return /^[0-9]+$/.test(variable);
}

function validateCpf(cpf) {
  if (cpf.length !== 11) return false;
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

function alreadyExists(cpf) {
  let patient = localStorage.getItem(cpf);
  return !!patient;
}

function alreadyHasMedication(cpf, medication) {
  let remedy = localStorage.getItem(`m-${cpf}`);
  if (!remedy) {
    return false;
  }
  remedy = JSON.parse(remedy);
  console.log(remedy);
  for (let i = 0; i < remedy.length; i++) {
    if (remedy[i].medication == medication) {
      return true;
    }
  }

  return false;
}

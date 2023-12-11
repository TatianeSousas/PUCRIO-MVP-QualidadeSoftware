from pydantic import BaseModel
from typing import Optional, List
from model.paciente import Paciente
import json
import numpy as np

class PacienteSchema(BaseModel):
    """ Define como um novo paciente a ser inserido deve ser representado
    """
    name: str = "Maria"
    Entubado: int = 2
    Pneumonia: int = 1
    Hipertenso: int = 1
    Diabetes: int = 1
    Asma: int = 1
    Obesidade: int = 1
    Tabaco:  int = 1
    Idade: int = 50 

class PacienteViewSchema(BaseModel):
    """Define como um paciente será retornado
    """
    id: int = 1
    name: str = "Maria"
    Entubado: int = 2
    Pneumonia: int = 1
    Hipertenso: int = 1
    Diabetes: int = 1
    Asma: int = 1
    Obesidade: int = 1
    Tabaco:  int = 1
    Idade: int = 50 
    outcome: int = None
    
class PacienteBuscaSchema(BaseModel):
    """Define como deve ser a estrutura que representa a busca.
    Ela será feita com base no nome do paciente.
    """
    name: str = "Maria"

class ListaPacientesSchema(BaseModel):
    """Define como uma lista de pacientes será representada
    """
    pacientes: List[PacienteSchema]

    
class PacienteDelSchema(BaseModel):
    """Define como um paciente para deleção será representado
    """
    name: str = "Maria"
    
# Apresenta apenas os dados de um paciente    
def apresenta_paciente(paciente: Paciente):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    return {
        "id": paciente.id,
        "name": paciente.name,
        "Entubado": paciente.Entubado,
        "Pneumonia": paciente.Pneumonia,
        "Hipertenso": paciente.Hipertenso,
        "Diabetes": paciente.Diabetes,
        "Asma": paciente.Asma,
        "Obesidade": paciente.Obesidade,
        "Tabaco": paciente.Tabaco,
        "Idade": paciente.Idade,
        "outcome": paciente.outcome
    }

# Apresenta uma lista de pacientes
def apresenta_pacientes(pacientes: List[Paciente]):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    result = []
    for paciente in pacientes:
        result.append({
            "id": paciente.id,
            "name": paciente.name,
            "Entubado": paciente.Entubado,
            "Pneumonia": paciente.Pneumonia,
            "Hipertenso": paciente.Hipertenso,
            "Diabetes": paciente.Diabetes,
            "Asma": paciente.Asma,
            "Obesidade": paciente.Obesidade,
            "Tabaco": paciente.Tabaco,
            "Idade": paciente.Idade,
            "outcome": paciente.outcome
        })

    return {"pacientes": result}


from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base

# colunas = Entubado,Pneumonia,Hipertenso,Diabetes,Asma,Obesidade,Tabaco,Idade,Outcome

class Paciente(Base):
    __tablename__ = 'pacientes'
    
    id = Column(Integer, primary_key=True)
    name= Column("Name", String(50))
    Entubado = Column("Entubado", Integer)
    Pneumonia = Column("Pneumonia", Integer)
    Hipertenso = Column("Hipertenso", Integer)
    Diabetes = Column("Diabetes", Integer)
    Asma = Column("Asma", Integer)
    Obesidade = Column("Obesidade", Integer)
    Tabaco = Column("Tabaco", Integer)
    Idade = Column("Idade", Integer)
    outcome = Column("Diagnostic", Integer, nullable=True)
    data_insercao = Column(DateTime, default=datetime.now())
    
    def __init__(self, Entubado:int, Pneumonia:int, Hipertenso:int, name:str,
                 Diabetes:int, Asma:int, Obesidade:int, 
                 Tabaco:int, Idade:int, outcome:int, 
                 data_insercao:Union[DateTime, None] = None):
        """
        Cria um Paciente

        Arguments:
        name: nome do paciente
            Entubado: número de vez que foi entubado
            Pneumonia: se está com pneumonia
            Hipertenso: se está hipertenso
            Diabetes: se está com diabetes
            Asma: se está com asma
            Obesidade: se está obeso
            Tabaco: se fuma
            Idade: idade
            outcome: diagnóstico
            data_insercao: data de quando o paciente foi inserido à base
        """
        self.name=name
        self.Entubado = Entubado
        self.Pneumonia = Pneumonia
        self.Hipertenso = Hipertenso
        self.Diabetes = Diabetes
        self.Asma = Asma
        self.Obesidade = Obesidade
        self.Tabaco = Tabaco
        self.Idade = Idade
        self.outcome = outcome

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao          
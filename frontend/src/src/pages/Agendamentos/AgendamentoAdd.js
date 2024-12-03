import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";


//Agendamento - id, dataHora, fkIdBarbeiro, fkIdCliente

export default function Agendamento() {
  const [clientes, setClientes] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState("");

  const handleAgendar = async () => {
    if (usuario === '' || dataSelecionada === '') {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
        const response = await fetch("https://localhost:3000/modelAgendamento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientes, dataHora: dataSelecionada }),
        });
    
        if (response.ok) {
          Alert.alert("Sucesso", "Agendamento realizado com sucesso!");
        } else {
          Alert.alert("Erro", "Não foi possível realizar o agendamento.");
        }
      } catch (error) {
        Alert.alert("Erro", "Erro de conexão com o servidor.");
      }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={clientes}
        onChangeText={setClientes}
      />

      <Text style={styles.label}>Selecione uma Data:</Text>
      <Calendar
        onDayPress={(day) => setDataSelecionada(day.dateString)}
        markedDates={{
          [dataSelecionada]: { selected: true, selectedColor: "blue" },
        }}
      />

      <Button title="Agendar" onPress={handleAgendar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
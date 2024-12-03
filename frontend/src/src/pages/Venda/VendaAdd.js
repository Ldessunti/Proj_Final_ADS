import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterVenda() {
  const navigation = useNavigation();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [venda, setVenda] = useState({
    dataVenda: '',
    fkIdCliente: '',
    fkIdProduto: '',
  });

  const handleChange = (name, value) => {
    setVenda((prevVenda) => ({
      ...prevVenda,
      [name]: value,
    }));
  };  


  const handleRegister = async () => {
    if (venda.dataVenda === '' || venda.fkIdCliente === '' || venda.fkIdProduto === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    parseInt(venda.fkIdCliente);
    parseInt(venda.fkIdProduto);
    
    try {
      const response = await fetch("http://localhost:3000/modelVenda", {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venda),
      });
      

      if (response.ok) {
        Alert.alert('Sucesso', 'Venda registrada com sucesso!');
        navigation.navigate('Vendas');
      } else {
        Alert.alert('Erro', 'Falha ao registrar a venda.');
      }
    } catch (error) {
      console.error('Erro ao registrar a venda:', error);
      Alert.alert('Erro', 'Falha ao registrar a venda.');
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/modelCliente");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:3000/modelProduto");
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {

    fetchClientes();
    fetchProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Venda</Text>

      <TextInput
        style={styles.input}
        placeholder="Data da Venda (DD/MM/AAAA)"
        value={venda.dataVenda}
        onChangeText={(itemValue) => handleChange('dataVenda', itemValue)}
      />

      <Text style={styles.label}>Selecione um Cliente:</Text>
      <Picker
        selectedValue={venda.fkIdCliente}
        onValueChange={(itemValue) => handleChange('fkIdCliente', itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Escolha um Cliente" value={undefined} />
        {clientes.map((cliente) => (
          <Picker.Item key={cliente.id} label={cliente.name} value={cliente.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecione um Produto:</Text>
      <Picker
        selectedValue={venda.fkIdProduto}
        onValueChange={(itemValue) => handleChange('fkIdProduto', itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Escolha um Produto" value={undefined} />
        {produtos.map((produto) => (
          <Picker.Item key={produto.id} label={produto.name} value={produto.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar Venda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
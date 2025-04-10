import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button } from 'react-native';

export default function App() {
  const [numeroSecreto, setNS] = useState(null);
  const [palpite, setP] = useState(null);
  const [tentativas, setT] = useState(null);

  const [message, setMessage] = useState(null);
  const [message1, setMessage1] = useState("Qual o numero de 0 a 100?");



  function validarPalpite() {
    while (palpite !== numeroSecreto) {
      let numeroSecreto = Math.floor(Math.random() * 100) + 1;
      let palpite = 0;

      palpite = parseInt(setMessage1("Digite um numero entre 1 e 100"));

      if(tentativas <= 5){
        if (palpite > numeroSecreto) {
            setMessage("O número é menor que "+ palpite)
        }
        else if (palpite < numeroSecreto) {
          setMessage("O número é maior que "+ palpite)
        }
        else if (palpite = numeroSecreto) {
          setMessage("Parabéns você acertou o número, ele é "+ numeroSecreto)
          return;
        }
      }
      else{
        setMessage("Acabou as tentativas! tente novamente!")
        return;
      }
    }
  }


  return (
    <SafeAreaView style={styles.container}> 

    <View style={styles.content}>

      <View style= {styles.titleBox}>
        <Text style={styles.title}>Qual o Número de 0 a 100?</Text>
      </View>

      <View> 
            <Text style={styles.label}>Digite o palpite:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setP}
              value={palpite ?? ''}
              placeholder='1 a 100'
              keyboardType='numeric'
            />
      </View>

      <View>

      <TouchableOpacity
          style={styles.button}
          onPress={() => validarPalpite()}
          >
            <Text style={styles.text}>Validar</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
           <Text style={styles.palpite}>{palpite}</Text>
           <Text style={styles.message}>{message}</Text>
          </View>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 25,
    padding: 25,
    alignItems: 'center',
  },

  content: {
    flex: 1,
    padding: 0,
    width: '100%',
    backgroundColor: '#edf2f',
  },

  
  titleBox: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 130,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
  },

  label: {
    fontSize: 18,
  },

  input: {
    color: '#180902',
    height: 45,
    width: '100%',
    borderColor: '#7A77FC',
    borderBottomWidth: 1.5,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 0,
  },

  button: {
    width:'100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 15,
  },

  text: {
    fontSize: 20,
  },

  palpite: {
    fontSize: 18,
    color: '#',
    fontWeight: 'bold',
    alignItems: 'center',
  },

  message: {
    fontSize: 48,
    color: '#',
    fontWeight: 'bold',
  },

});

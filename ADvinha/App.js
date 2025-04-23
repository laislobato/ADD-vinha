import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';


export default function App() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [numeroSecreto, setNS] = useState(null);
  const [palpite, setP] = useState(null);
  const [tentativas, setT] = useState(null);

  const [message, setMessage] = useState(null);



  
  useEffect(() => {
    // Gera o número secreto quando o app carrega
    const numero = Math.floor(Math.random() * 100) + 1;
    setNS(numero);

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };

  }, []);

  

  const validarPalpite = () => {
    Keyboard.dismiss();
    const palpiteInt = parseInt(palpite);


    setT(tentativas + 1);

    if (palpiteInt > numeroSecreto && palpiteInt >= 1 && palpiteInt <= 100) {
      setMessage("O número é menor que "+ palpite);
    } else if (palpiteInt < numeroSecreto && palpiteInt >= 1 && palpiteInt <= 100) {
      setMessage("O número é maior que "+ palpite);
    } else if (palpiteInt === numeroSecreto){
      setMessage(`Parabéns! Você acertou em ${tentativas + 1} tentativas. O numero é `+ palpite);
      // Gera um novo número secreto para continuar jogando
      setNS(Math.floor(Math.random() * 100) + 1);
      setT(null);
    }
      else{
        setMessage("Digite um número válido!");
        setP(null);
        return;
      }

    setP(null);

    };
    const restart = () => {
      setNS(null);
      setP(null);
      setT(null);
      setMessage(null);
      return;
  };



  return (
    <SafeAreaView style={styles.container}> 

    <View style={styles.content}>

      <View style= {styles.titleBox}>
        <Text style={styles.title}>Qual o Número de 1 a 100?</Text>
      </View>

      <View> 
            <Text style={styles.label}>Digite o palpite:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setP}
              value={palpite ?? ''}  // isso é importante!
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
          <Text style={styles.message}>{message}</Text>
      </View>

      {!keyboardVisible && (
  <View style={styles.containerRestart}>
    <TouchableOpacity
      style={styles.buttonRestart}
      onPress={restart}
    >
      <Text style={styles.text}>Restart</Text>
    </TouchableOpacity>
  </View>
)}



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
    marginBottom: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
  },

  label: {
    fontSize: 20,
  },

  input: {
    color: '#180902',
    height: 58,
    width: '100%',
    borderColor: '#2ebdff',
    borderBottomWidth: 1.5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 0,
  },

  button: {
    width:'100%',
    backgroundColor: '#2ebdff',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 15,
  },

  containerRestart: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center', 

  },

  buttonRestart: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'65%',
    backgroundColor: '#617178',
    borderRadius: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 15,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  textRestart: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  message: {
    fontSize: 26,
    color: '#',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

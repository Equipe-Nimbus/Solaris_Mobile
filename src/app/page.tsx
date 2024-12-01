import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowDown, ArrowRight } from 'phosphor-react-native'; // Certifique-se de instalar essa versão para nativo

export default function LandingPage() {
  const navigation = useNavigation();

  const scrollToSection = () => {
    Alert.alert("Scroll", "Implemente a rolagem para a seção 'Sobre o Projeto'");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonOutline}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonPrimary}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Análise e processamento de imagens de satélite.
        </Text>
        <Text style={styles.heroDescription}>
          Identificação de nuvens e sombras utilizando inteligência artificial. Simplifica a consulta, geração de máscaras e análise dos dados.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.primaryButtonText}>
            Consultar imagens
          </Text>
          <ArrowRight size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={scrollToSection}>
          <Text style={styles.ghostButtonText}>Saiba mais sobre o projeto</Text>
          <ArrowDown size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Sobre o Projeto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o projeto</Text>
        <Text style={styles.sectionDescription}>
          O Solaris é uma plataforma web e mobile que aplica inteligência artificial para gerar máscaras de nuvens e sombras em imagens capturadas pelo satélite CBERS4A com o sensor WPM, fornecidas pelo INPE.
        </Text>
        <Image source={require('./assets/results.gif')} style={styles.image} />
      </View>

      {/* Como funciona */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como funciona?</Text>
        <View style={styles.stepsContainer}>
          {["Consulta ao catálogo", "Processamento", "Resultados", "Análise"].map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <View>
                <Text style={styles.stepTitle}>{step}</Text>
                <Text style={styles.stepDescription}>
                  {index === 0
                    ? "Defina sua área de interesse e período."
                    : index === 1
                    ? "Solaris consulta o catálogo do INPE e processa as imagens."
                    : index === 2
                    ? "Receba as máscaras de nuvens, sombras de nuvens e outras informações."
                    : "Analise, baixe os arquivos e use os conforme precisar."}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121416',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#08090A',
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 10,
  },
  logo: {
    width: 90,
    height: 26,
    resizeMode: 'contain',
  },
  buttonOutline: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 8,
    borderRadius: 6,
  },
  hero: {
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    marginRight: 8,
  },
  ghostButton: {
    marginTop: 20,
  },
  ghostButtonText: {
    color: '#ccc',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
  stepsContainer: {
    marginTop: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    color: '#fff',
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepDescription: {
    fontSize: 14,
    color: '#ccc',
  },
});

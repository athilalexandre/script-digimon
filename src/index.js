const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// URLs das APIs
const VERCEL_API_URL = 'https://digimon-api.vercel.app/api/digimon';
const DIGI_API_BASE_URL = 'https://digi-api.com/api/v1/digimon';

// Mapeamento de níveis da Digi-API para o esquema
const LEVEL_MAPPING = {
  'Fresh': 'Baby I',
  'In Training': 'Baby II',
  'Rookie': 'Child',
  'Champion': 'Adult',
  'Ultimate': 'Perfect',
  'Mega': 'Ultimate',
  'Hybrid': 'Hybrid',
  'Armor': 'Armor',
  'Super Ultimate': 'Super Ultimate'
};

// Função para mapear o tipo do Digimon
function mapDigimonType(type) {
  const typeMap = {
    'Data': 'Data',
    'Virus': 'Virus',
    'Vaccine': 'Vacina'
  };
  return typeMap[type] || null;
}

// Função para mapear o atributo do Digimon
function mapDigimonAttribute(attribute) {
  const attributeMap = {
    'Fire': 'Fogo',
    'Plant': 'Planta',
    'Water': 'Água',
    'Electric': 'Elétrico',
    'Wind': 'Vento',
    'Earth': 'Terra',
    'Light': 'Luz',
    'Dark': 'Escuridão',
    'Neutral': 'Neutro'
  };
  return attributeMap[attribute] || 'Neutro';
}

// Função para coletar dados da API Vercel
async function fetchVercelDigimon() {
  try {
    const response = await axios.get(VERCEL_API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API Vercel:', error.message);
    return [];
  }
}

// Função para coletar dados da Digi-API
async function fetchDigiApiDigimon() {
  let allDigimon = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(`${DIGI_API_BASE_URL}?page=${page}`);
      const digimon = response.data.content;
      
      if (digimon && digimon.length > 0) {
        allDigimon = allDigimon.concat(digimon);
        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Erro ao buscar página ${page} da Digi-API:`, error.message);
      hasMore = false;
    }
  }

  return allDigimon;
}

// Função para processar e combinar os dados
async function processDigimonData() {
  const vercelDigimon = await fetchVercelDigimon();
  const digiApiDigimon = await fetchDigiApiDigimon();

  const processedDigimon = vercelDigimon.map(vercelDigi => {
    // Encontrar correspondência na Digi-API
    const digiApiMatch = digiApiDigimon.find(
      digi => digi.name.toLowerCase() === vercelDigi.name.toLowerCase()
    );

    return {
      name: vercelDigi.name,
      stage: digiApiMatch ? LEVEL_MAPPING[digiApiMatch.level] || 'Child' : 'Child',
      type: digiApiMatch ? mapDigimonType(digiApiMatch.type) : null,
      attribute: digiApiMatch ? mapDigimonAttribute(digiApiMatch.attribute) : 'Neutro',
      baseStats: {
        hp: 10,
        forca: 1,
        defesa: 1,
        velocidade: 1,
        sabedoria: 1
      },
      evolvesTo: digiApiMatch?.evolvesTo?.[0]?.name || null,
      evolvesFrom: digiApiMatch?.evolvesFrom?.[0]?.name || null
    };
  });

  return processedDigimon;
}

// Função principal
async function main() {
  try {
    console.log('Iniciando coleta de dados...');
    const processedData = await processDigimonData();
    
    // Criar diretório de saída se não existir
    const outputDir = path.join(__dirname, '..', 'output');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Salvar dados processados
    const outputPath = path.join(outputDir, 'digimon_data_combined.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify(processedData, null, 2),
      'utf8'
    );
    
    console.log(`Dados processados salvos em: ${outputPath}`);
    console.log(`Total de Digimon processados: ${processedData.length}`);
  } catch (error) {
    console.error('Erro durante o processamento:', error);
  }
}

// Executar o script
main(); 
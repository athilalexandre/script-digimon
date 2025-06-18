# Projeto Digimon Database

Este projeto é uma base de dados completa de Digimons, contendo informações detalhadas sobre cada criatura digital, incluindo suas evoluções, estágios e estatísticas.

## 📋 Estrutura do Projeto

```
.
├── output/
│   └── digimon_data_combined.json    # Arquivo principal com dados dos Digimons
└── README.md                         # Este arquivo
```

## 🎮 Sobre o Projeto

Este projeto mantém uma base de dados estruturada de Digimons, incluindo:

- Nome do Digimon
- Estágio de evolução (Child, Adult, Perfect, Mega, Ultimate)
- Atributos
- Estatísticas base (HP, Força, Defesa, Velocidade, Sabedoria)
- Linhas de evolução (evolvesTo e evolvesFrom)

## 📊 Estrutura dos Dados

Cada Digimon no arquivo JSON contém as seguintes informações:

```json
{
    "name": "Nome do Digimon",
    "stage": "Estágio de Evolução",
    "type": "Tipo",
    "attribute": "Atributo",
    "baseStats": {
        "hp": 10,
        "forca": 1,
        "defesa": 1,
        "velocidade": 1,
        "sabedoria": 1
    },
    "evolvesTo": ["Digimons para os quais evolui"],
    "evolvesFrom": ["Digimons dos quais evolui"]
}
```

## 🌟 Principais Linhas de Evolução

O projeto inclui as principais linhas de evolução dos Digimons originais:

1. **Agumon**
   - Koromon -> Agumon -> Greymon -> MetalGreymon -> WarGreymon -> Omnimon

2. **Gabumon**
   - Tsunomon -> Gabumon -> Garurumon -> WereGarurumon -> MetalGarurumon -> Omnimon

3. **Biyomon**
   - Yokomon -> Biyomon -> Birdramon -> Garudamon -> Phoenixmon

4. **Tentomon**
   - Motimon -> Tentomon -> Kabuterimon -> MegaKabuterimon -> HerculesKabuterimon

5. **Palmon**
   - Tanemon -> Palmon -> Togemon -> Lillymon -> Rosemon

6. **Gomamon**
   - Bukamon -> Gomamon -> Ikkakumon -> Zudomon -> Vikemon

7. **Patamon**
   - Tokomon -> Patamon -> Angemon -> MagnaAngemon -> Seraphimon

## 🎯 Como Usar

1. Clone o repositório
2. Acesse o arquivo `output/digimon_data_combined.json`
3. Utilize os dados conforme necessário para seu projeto

## 📝 Notas

- Os dados são baseados no cânone oficial da franquia Digimon
- Inclui evoluções alternativas e formas X para alguns Digimons
- As estatísticas base são valores iniciais e podem ser ajustadas conforme necessário

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você quiser adicionar mais Digimons ou atualizar informações existentes:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Bandai Namco pela criação da franquia Digimon
- Comunidade Digimon por manter viva a paixão pela franquia

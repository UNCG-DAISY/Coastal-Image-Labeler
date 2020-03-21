import pandas as pd

importJSON = 'data/outputs/formattedJSON.json'
outputCSV = 'data/outputs/imageDataFormatedCSV.csv'

data = pd.read_json(importJSON,orient='index')
data.to_csv(outputCSV)
print('Done formatting json to csv')
this contract allows to request (generate) and reveal random numbers.

it works fine on testnet: 0xFaCF1FDf1eE5D0e03AEFdB2511ced41d3F713446

this contract is called in generateRandomNumber function at backend/src/utils/QRNG.ts

for the distribution, we used the Knuth Shuffle, 
also known as the Fisher-Yates Shuffle or the Durstenfeld Shuffle.
This algorithm was developed by computer scientist Donald E. Knuth in 1969.


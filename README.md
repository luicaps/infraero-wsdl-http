# infraero-wsdl-http
A Simple NodeJS API which uses the WSDL server from Infraero of Brazilian flight status and externalize the data as an API, outputing a json for each request.

# About this project
To this date there is no machine-friendly way to extract flight status data from Brazilian flights. According to the Brazilian Information Access Law , all public organizations must release data which is either generated or guarded by them in a machine readable format. Since these flight status are one of these guarded data and are already publicized in non-machine-readable formats (thus confirming that they are not classified and that their disclosure is not a threat to the country's safety), it is safe to assume that they could be released in a machine readable format.

This is where this project comes in. After searching for ways to extract flight status, we found that actually there is a SOAP webservice which is used by an Android app (https://goo.gl/ti4ZMk) to get flight data. All we've done was to write a API which acts as a SOAP client, making calls to the SOAP webservice and outputing them as JSON. Simple as that.

## Available methods and parameters
The started server answers only to requests from /api/<method_name> (e.g. ConsultarVoosNumero). The GET query is sent to the SOAP webservice without modifications. Currently, the methods available are those from the SOAP webservice (so that's why they are in PT-BR). These are:

#### ListarAeroportos
Returns a list of all Brazilian airports 

Parameters: 
- idioma: bra|esp|usa || language
Usage:
```
../api/ListarAeroportos?idioma=bra
```

### ConsultarVoosNumero
Returns information about one flight (or multiple ones, when no flight number is informed). It is a "paged call", which means you ust inform number of results per page and the page you want to retrieve with the current call.

Parameters:
- icao : string || ICAO airport code (four letter code - can be retrieved from ListarAeroportos method) 
- idioma: bra|esp|usa || language
- partida: true|false || if true, it returns flights departing form the informed airport; if false, returns flights arriving at the airport
- numeroVoo: string || flight number. if an empty string, it returns all flights matching the other criteria
- exibirFinalizados: <true|false> || if true, it returns **also** ended flight(s) (flights which already finished the departure or arrival process).
- registrosPorPagina: <number> || informs how many results must be returned from the current call. Tip: set to 1 if only looking for one flight
- pagina: number || informs the page number from the results which will be returned. Tip: set to 1 if only looking for one flight 

Usage example:
```
../api/ConsultarVoosNumero?icao=SBRJ&idioma=bra&partida=true&numeroVoo=1234&exibirFinalizados=true&registrosPorPagina=1&pagina=1
```

### ConsultarVoosSentido
Returns all flights from/to the informed airport. It is a "paged call", which means you ust inform number of results per page and the page you want to retrieve with the current call.

Parameters:
- icao : string || ICAO airport code (four letter code - can be retrieved from ListarAeroportos method) 
- idioma: bra|esp|usa || language
- partida: true|false || if true, it returns flights departing form the informed airport; if false, returns flights arriving at the airport
- exibirFinalizados: true|false || if true, it returns **also** ended flight(s) (flights which already finished the departure or arrival process).
- registrosPorPagina: number || informs how many results must be returned from the current call.
- pagina: number || informs the page number from the results which will be returned. 

Usage example:
```
../api/ConsultarVoosSentido?icao=SBRJ&idioma=bra&partida=true&exibirFinalizados=true&registrosPorPagina=1&pagina=1
```

#### ListarCompanhias
Returns a list of all companies in the informed airport

Parameters: 
- icao : string || ICAO airport code (four letter code - can be retrieved from ListarAeroportos method) 
- idioma: bra|esp|usa || language

Usage example:
```
../api/ListarCompanhias?icao=SBRJ&idioma=bra
```

### ConsultarVoosCiaAerea
Returns all flights from an airline in the informed airport. It is a "paged call", which means you ust inform number of results per page and the page you want to retrieve with the current call.

Parameters:
- icao : string || ICAO airport code (four letter code - can be retrieved from ListarAeroportos method) 
- idioma: bra|esp|usa || language
- partida: true|false || if true, it returns flights departing form the informed airport; if false, returns flights arriving at the airport
- exibirFinalizados: true|false || if true, it returns **also** ended flight(s) (flights which already finished the departure or arrival process).
- registrosPorPagina: number || informs how many results must be returned from the current call.
- pagina: number || informs the page number from the results which will be returned. 

Usage:
```
../api/ConsultarVoosCiaAerea?icao=SBRJ&idioma=bra&partida=true&&exibirFinalizados=true&registrosPorPagina=1&pagina=1
```

# Dependencies 
This project has three main dependencies: 
- soap (https://github.com/vpulim/node-soap), 
- xml2json (https://github.com/buglabs/node-xml2json) 
- express (https://github.com/strongloop/express)

You must install them (via npm) before running things.

# How to run it
```
npm install
node app.js
```

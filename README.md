# infraero-wsdl-restapi
API simples em NodeJS que utiliza o servido WSDL da Infraero e externaliza seus serviços como uma API Rest

# Como usar

```
npm install
node app.js
```

O servidor iniciado responde apenas para requisições em "/api/", seguido do nome do serviço da Infraero (e.g. ConsultarVoosNumero). A query enviada na requisição também é repassada para o SOAP.

Exemplo:

http://localhost:3000/api/ListarAeroportos?idioma=bra

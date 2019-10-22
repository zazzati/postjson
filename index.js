
const fs = require('fs');

const http = require('http');
const https = require('https');
const express = require('express');
const request = require('request')

const app = express();

// Certificate
const privateKey = fs.readFileSync('openssl.key', 'utf8').toString();
const certificate = fs.readFileSync('openssl.crt', 'utf8').toString();
//const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');
// var credentials = crypto.createCredentials({key: privateKey, cert: certificate});



const credentials = {
	key: privateKey,
	cert: certificate,
	 passphrase: 'PIEMONTE'                           
};

app.use((req, resp) => {
      
      var headers = { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
        "content-type": "application/json"
      };
    
      
      var options = {
        uri: 'http://www.csi.it',
        method: 'POST',
        headers: headers,
        json: {
            "dato": "roba"
          }
      };
      
     request.post(options, (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
      resp.send(body);
      console.log(`statusCode: ${res.statusCode}`)
      console.log(body) 
   
    })
  
});

// Starting both http & https servers
const httpServer = http.createServer(app);      
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
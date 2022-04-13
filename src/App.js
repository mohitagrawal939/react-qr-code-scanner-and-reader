import React, { useRef, useState } from "react";
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core'
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader'


function App() {
  const classes = useStyle();
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const qrRef = useRef(null);


  const generateQrCOde = async () => {
    try{
      const response = await QRCode.toDataURL(text);
      setImageUrl(response)
    }catch(error){
      console.log(error);
    }
  }

  const handleErrorFile = (error) => {
    console.log(error);
  }

  const handleScanFile = (result) => {
    if(result){
      console.log(result);
      setScanResultFile(result);
    }
  }

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Generate Download & Scan QR Code in React.JS</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
              <Button className={classes.btn} variant="contained" 
              color="primary" onClick={() => generateQrCOde()}>Generate</Button>
              <br/>
              <br/>
              <br/>
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="Image here"/>
                </a>
              ) : null}
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan QR Code</Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{width: 'with100%'}}
                onError={handleErrorFile}
                onScan={handleScanFile}
                onLoad={handleScanFile}
                legacyMode
              />
              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyle = makeStyles((theme) => ({
  container : {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
  marginTop: 10,
  marginBottom: 20
  }
}));

export default App;

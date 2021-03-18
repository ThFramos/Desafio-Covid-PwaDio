import {memo} from 'react';
import RefreshIcon from '../../../assets/images/refresh.svg'
import { Card, Typography, Button, Select, MenuItem } from '../../../components/index';
import COUNTRIES from '../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style';

const navigatorHasShare = navigator.share;

function Panel({updateAt, onChange, data, country, getCovidData}){
  const {cases, recovered, deaths, todayCases, TodayDeaths} = data;



  const shareInfo = () =>{
    navigator.share({
      title: `Dados do Covid19 - ${country}`,
      text: textCovid19,
      url: 'https://covidedio.netlify.app/'
    })
  }

  
  const copyInfo = () =>{
    navigator.clipboard.writeText(textCovid19)
  }
  const renderCountries = (country, index) =>(
    <MenuItem key={`country-${index}`} value={country.value}>
    <ItemStyled>
      <div>{country.label} </div>
      <img src={country.flag} alt={`Pais-${country.label}`} />
    </ItemStyled>
  </MenuItem>
  )

  const renderShareButton = (
    <div>
      <Button variant="contained" color="primary" onClick={shareInfo}>
        Compartilhar
      </Button>
    </div>
  );

  const textCovid19 =`Pais: ${country} - recuperados: ${recovered}`

 


  const renderCopyButton = (
    <div>
      <Button variant="container" color="primary" onClick={copyInfo}>
        Copiar
      </Button>
    </div>
  );


return(
  <Card>
    <CardPanelContentStyled>
    <div>
      <Typography variant="h5" component="span" color="primary">COVIDE</Typography>
      <Typography variant="h6" component="span" color="primary">Painel Coronavírus</Typography>
      <Typography variant="body2" component="span" color="primary">Atualizado em : {updateAt}</Typography>
      <div className="pt-2">
        <Select onChange={onChange} value={country}>
          {COUNTRIES.map(renderCountries)}
        </Select>
      </div>
    
    </div>
    {navigatorHasShare ? renderShareButton : renderCopyButton}
    </CardPanelContentStyled>
  </Card>
)
}

export default memo(Panel);


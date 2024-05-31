import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const App: React.FC = () => {
  const cld = new Cloudinary({cloud: {cloudName: 'dbsou9jps'}});
  
  const img = cld.image('icons8-tick-24_jlrifq')
        .format('auto') 
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); 

  return (<AdvancedImage cldImg={img}/>);

}

export default App;

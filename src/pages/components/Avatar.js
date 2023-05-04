/* eslint-disable */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import styles from './Avatar.module.css';

function Modal({ visible, image, setVisible, setImage,setAvatar }) {

  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      setAvatar(dataUrl)
      setVisible(false)
      setImage(null)
    }
  };

  useEffect(()=>{
    return () => {
      setScale(1)
    }
  },[])

  return (
    <div className={styles.mask} style={{
      display : visible ? 'flex' : 'none'
    }}>
      <div className={styles.maskContent}>
        <span className={styles.maskTitle}>剪裁头像</span>
        {
          image && (
            <AvatarEditor
              ref={(editor) => setEditor(editor)}
              image={image}
              width={250}
              height={250}
              border={10}
              color={[255, 255, 255, 1]}
              scale={scale}
              borderRadius={125}
              rotate={0}
            />
          )
        }
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={scale}
          className={styles.range}
          onChange={ e => setScale(parseFloat(e.target.value))}
        />
        <button className={`save ${styles.confirmBtn}`} onClick={handleSave}>确定</button>
      </div>
    </div>
  )
}

const AvatarUploader = ({avatar,setAvatar}) => {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if(file){
      setImage(e.target.files[0]);
      setVisible(true)
    }
  };


 

  return (
    <div>
      <div className={styles.avatarContainer}>
        {
          avatar ? 
          <Image src={avatar} width={100} height={100} alt="avatar" style={{ borderRadius: '50%' }} />
          :
          <div className={styles.emptyAvatar} />
        }
        <label htmlFor="fileInput" className={styles.label}>修改</label>
        <input id="fileInput" type="file" onChange={handleImageChange} className={styles.input}/>
      </div>
      <Modal visible={visible} image={image} setImage={setImage} setAvatar={setAvatar} setVisible={setVisible} />
    </div>
  );
};

export default AvatarUploader;



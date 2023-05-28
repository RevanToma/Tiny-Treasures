import { FC, useEffect, useRef, useState } from 'react';
import { theme } from '../../../styles/themes';
import { FaRegImages, FaPlus } from 'react-icons/fa';
import * as S from './uploadImageBox.styles';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { IConvertedChangeData, IGivePreviewFormData } from '../give.types';
import { getImgBox, getMainImgBox, getRemoveIcon } from '../give.helpers';
import Box from '../../../components/common/Box/Box';
import { MAX_POST_PHOTOS } from '../../../utils/variables';

interface UploadImageBoxProps {
  formValues: IGivePreviewFormData;
  handleChange: (data: IConvertedChangeData) => void;
}

const UploadImageBox: FC<UploadImageBoxProps> = ({
  formValues,
  handleChange,
}) => {
  const imgPreviewRef = useRef<HTMLDivElement | null>(null);
  const imgPreviewMainRef = useRef<HTMLDivElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgFilesRef = useRef<File[]>([...formValues.images]);

  const [imgUrls, setImgUrls] = useState(formValues.imgUrls);

  useEffect(() => {
    if (formValues.images.length === 0) return;

    handleChooseImage();
  }, []);

  const setImagesToFormValues = (): void => {
    const data = {
      name: 'images',
      value: imgFilesRef.current,
    };
    handleChange(data);
  };

  const clearImageElements = () => {
    [imgPreviewRef.current, imgPreviewMainRef.current].forEach(el => {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    });
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChooseImage = () => {
    if (!fileInputRef.current?.files) return;

    const files = [...fileInputRef.current.files];
    const newFileArray = [...imgFilesRef.current, ...files];
    imgFilesRef.current = newFileArray;

    setImagesToFormValues();
    clearImageElements();

    newFileArray.forEach((file, i, arr) => {
      if (i >= MAX_POST_PHOTOS) return;
      const reader = new FileReader();
      const imgBox =
        i < arr.length - 1 && i < MAX_POST_PHOTOS - 1
          ? getImgBox(file.name, i)
          : getMainImgBox(file.name, i);
      const removeIcon = getRemoveIcon(i);

      removeIcon.addEventListener('click', () => {
        const newFileArray = [...imgFilesRef.current];
        const index = newFileArray.findIndex(imgFile => {
          return file.name === imgFile.name;
        });
        newFileArray.splice(index, 1);
        imgFilesRef.current = newFileArray;
        setImagesToFormValues();

        document.getElementById(`img-box-${file.name}-${i}`)?.remove();
      });

      const handleLoad = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.id = `${file.name}-${i}`;
        imgBox.appendChild(img);
        imgBox.appendChild(removeIcon);
        if (i < arr.length - 1 && i < MAX_POST_PHOTOS - 1) {
          imgPreviewRef.current?.appendChild(imgBox);
        } else {
          imgPreviewMainRef.current?.appendChild(imgBox);
        }
      };
      reader.addEventListener('load', handleLoad);

      if (!file || !file.type.startsWith('image/')) return;
      reader.readAsDataURL(file);
    });
  };

  const maxImages = (): boolean => {
    return imgFilesRef.current.length + imgUrls.length >= MAX_POST_PHOTOS;
  };

  const removeSavedImage = (i: number) => {
    const newImgUrls = [...imgUrls];
    newImgUrls.splice(i, 1);
    setImgUrls(newImgUrls);

    handleChange({ name: 'imgUrls', value: newImgUrls });
  };

  const getIsGap = () => {
    return imgUrls.length > 0 && imgFilesRef.current.length > 0;
  };

  return (
    <S.Wrapper
      borderRadius={theme.radius.image}
      alignItems="center"
      justifyContent="center"
      marginBottom="3.6rem"
    >
      <S.FileInput
        onChange={handleChooseImage}
        ref={fileInputRef}
        type="file"
        multiple
      />
      {imgUrls.length === 0 && imgFilesRef.current.length > 0 && (
        <Box marginBottom="2.4rem">
          <FaRegImages color={theme.color.placeholderText} size={72} />
        </Box>
      )}

      <p id="upload-item">Upload Item</p>
      <S.ImagePreviewBoxMain ref={imgPreviewMainRef}></S.ImagePreviewBoxMain>
      <S.ImagePreviewBoxMain>
        {imgUrls.length > 0 && !imgFilesRef.current.length && (
          <Box>
            <div onClick={() => removeSavedImage(0)} className="remove-icon">
              x
            </div>
            <img src={imgUrls[0]} alt="Kids Items" />
          </Box>
        )}
      </S.ImagePreviewBoxMain>
      <S.ImagePreviewBoxWrapper isGap={getIsGap()}>
        <S.ImagePreviewBox ref={imgPreviewRef}></S.ImagePreviewBox>

        <S.ImagePreviewBox>
          {imgUrls.length > 0 &&
            imgUrls.map((image, i) => {
              if (
                (i === 0 && !imgFilesRef.current.length) ||
                i >= MAX_POST_PHOTOS
              ) {
                return;
              } else {
                return (
                  <Box className="img-box" key={image}>
                    <div
                      onClick={() => removeSavedImage(i)}
                      className="remove-icon"
                    >
                      x
                    </div>

                    <img src={imgUrls[i]} alt="Kids Items" />
                  </Box>
                );
              }
            })}
        </S.ImagePreviewBox>
      </S.ImagePreviewBoxWrapper>

      {maxImages() ? (
        <p style={{ color: 'red' }}>
          You have reached the maximum number of images!
        </p>
      ) : (
        <p>Upload Images here from your photo library</p>
      )}

      <Button
        iconLeft={maxImages() ? undefined : <FaPlus />}
        buttonType={maxImages() ? ButtonType.Disabled : ButtonType.Secondary}
        onClick={openFilePicker}
      >
        Add Image
      </Button>
    </S.Wrapper>
  );
};

export default UploadImageBox;

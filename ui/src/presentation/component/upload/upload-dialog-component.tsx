import Styles from './upload-dialog-component.styles.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Base64Encode } from '@/infra/protocols/base64-encode'
import Compressor from 'compressorjs'

import uniqid from 'uniqid'
import { ErrorComponent } from '../error-component/error-component'
interface PropsParams {
  states?: Function
  base64Converter: Base64Encode
  formFieldEmit: Function
  accept?: string
  addButtonTitle?: string
  isMobile?: boolean
  listenProgress?: React.Dispatch<React.SetStateAction<number>>
}

export const UploadDialogComponent: React.FC<PropsParams> = ({ isMobile, listenProgress, base64Converter, states, formFieldEmit, addButtonTitle, ...props }: PropsParams) => {
  const inputFile = useRef<HTMLInputElement>()
  const dialogRef = useRef<any>()
  const saveSVG = useRef<SVGSVGElement>()

  const [lialogOpened, setDialogOpened] = useState(false)
  const [compressedFile, setCompressedFile] = useState(null)
  const [state, setState] = useState({
    error: null,
    fileName: null,
    fileSize: null
  })

  useEffect(() => {
    listenDialogClose()
    openDialog()

    saveSVG.current?.addEventListener('click', (ev) => {
      ev.stopImmediatePropagation()
      ev.stopPropagation()
      ev.preventDefault()
      inputFile.current.click()
    })
  }, [])

  useEffect(() => {
    dialogRef.current.addEventListener('close', closeFunction)
    return () => {
      dialogRef.current?.removeEventListener('close', closeFunction)
    }
  }, [compressedFile])

  const fileSizeLimit = (size: number): boolean => {
    return false
  }

  const closeFunction = async (): Promise<void> => {
    if (inputFile.current.files.item(0)?.name) {
      const { name, size, type } = compressedFile
      const encode = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsBinaryString(compressedFile)
        reader.onload = function (event) {
          const b64 = base64Converter.encode(event.target.result as string)
          resolve(b64)
        }

        reader.onerror = function () {
          reject(new Error())
        }
      })
      const fileInfo = {
        fileBase64: encode,
        fileName: prepName(name, type),
        size,
        contentType: type
      }
      formFieldEmit({ target: { value: fileInfo } })
    }

    setDialogOpened(false)
    if (states) states(false)
  }

  // const prepName = (name: string): string => name.replaceAll(' ', '-').replaceAll(/[^a-zA-Z0-9. ]/g, '')
  // const prepName = (name: string): string => name.findLast(el => el)
  const prepName = (name: string, type: string): string => {
    const typeFile = type.split('/')
    const fileExtension = typeFile[typeFile.length - 1]
    if (!(['pdf', 'png', 'jpeg', 'jpg'].some(extension => extension === fileExtension))) return
    return `${uniqid()}.${fileExtension}`
  }

  const listenDialogClose = (): void => {
    document.addEventListener('keyup', (key: KeyboardEvent) => {
      if (key.key === 'Escape') {
        closeFunction()
      }
    })
    dialogRef.current?.addEventListener('click', (event: any) => {
      // event.preventDefault()
    })
    inputFile.current.addEventListener('change', () => {
      if (inputFile.current.files.item(0)?.name) {
        const { name, size, type } = inputFile.current.files.item(0)
        if (!fileSizeLimit(size)) {
          setState({
            ...state,
            fileName: prepName(name, type),
            fileSize: `${Math.round(size / 1000)}Kb`
            // error: fileSizeLimit(size) ? new FileSizeExceedsLimitError('200KB') : null
          })
          setCompressedFile(inputFile.current.files.item(0))
          return
        }
        const promise = new Promise((resolve, reject) => {
          const com = new Compressor(inputFile.current.files.item(0), {
            quality: size >= 2000000 && size < 2500000 ? 0.9 : size >= 2500000 && size < 3000000 ? 0.8 : size >= 3000000 && size < 6000000 ? 0.7 : 0.2,
            success: (compressedResult) => {
              // compressedResult has the compressed file.
              // Use the compressed file to upload the images to your server.
              setCompressedFile(compressedResult)
              resolve(compressedResult)
            }
          })
        }).then((image: any) => {
          setState({
            ...state,
            fileName: prepName(name, type),
            fileSize: `${Math.round(image.size / 1000)}Kb`
            // error: fileSizeLimit(size) ? new FileSizeExceedsLimitError('200KB') : null
          })
        })
      }
    })
  }
  const openDialog = useCallback((): void => {
    if (typeof dialogRef?.current?.showModal === 'function') {
      dialogRef.current.removeAttribute('open')
      setDialogOpened(true)
      dialogRef.current.showModal()
    }
  }, [lialogOpened])

  const openInputFile = (event): void => {
    inputFile.current.click()
  }

  const handleCompressedUpload = (e): void => {
    const image = e.target.files[0]
    const { size } = image
    if (fileSizeLimit(size)) {
      const calc = (image.size / 200000) / 100
      const compress = new Compressor(image, {
        quality: Math.round(calc < 1 ? 0.2 : calc), // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          setCompressedFile(compressedResult)
        }
      })
    }
  }

  return (
    <div>
      <div className={[Styles.modalOverlay, lialogOpened ? Styles.modalOverlayOn : ' '].join(' ')}></div>
      <div className={Styles.wrapDialog}>
        <dialog
          ref={dialogRef}
        >
          <div className={Styles.dialogBody}>
            <input
              {...props}
              // accept={!isMobile ? '' : 'image/*'}
              type="file"
              id="myfile"
              name="myfile"
              className={Styles.inputFile}
              ref={inputFile}
              onClick={e => e.stopPropagation()}
              data-testid="uploadInput"
              capture={!isMobile ? false : 'user'}
              onChange={(event) => handleCompressedUpload(event)}
            >
            </input>
            <svg data-testid="uploadAvatarFile" onClick={openInputFile} ref={saveSVG} width="1664" height="1600" viewBox="0 0 1664 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1280 1408C1280 1390.67 1273.67 1375.67 1261 1363C1248.33 1350.33 1233.33 1344 1216 1344C1198.67 1344 1183.67 1350.33 1171 1363C1158.33 1375.67 1152 1390.67 1152 1408C1152 1425.33 1158.33 1440.33 1171 1453C1183.67 1465.67 1198.67 1472 1216 1472C1233.33 1472 1248.33 1465.67 1261 1453C1273.67 1440.33 1280 1425.33 1280 1408ZM1536 1408C1536 1390.67 1529.67 1375.67 1517 1363C1504.33 1350.33 1489.33 1344 1472 1344C1454.67 1344 1439.67 1350.33 1427 1363C1414.33 1375.67 1408 1390.67 1408 1408C1408 1425.33 1414.33 1440.33 1427 1453C1439.67 1465.67 1454.67 1472 1472 1472C1489.33 1472 1504.33 1465.67 1517 1453C1529.67 1440.33 1536 1425.33 1536 1408ZM1664 1184V1504C1664 1530.67 1654.67 1553.33 1636 1572C1617.33 1590.67 1594.67 1600 1568 1600H96C69.3333 1600 46.6667 1590.67 28 1572C9.33333 1553.33 0 1530.67 0 1504V1184C0 1157.33 9.33333 1134.67 28 1116C46.6667 1097.33 69.3333 1088 96 1088H523C537 1125.33 560.5 1156 593.5 1180C626.5 1204 663.333 1216 704 1216H960C1000.67 1216 1037.5 1204 1070.5 1180C1103.5 1156 1127 1125.33 1141 1088H1568C1594.67 1088 1617.33 1097.33 1636 1116C1654.67 1134.67 1664 1157.33 1664 1184ZM1339 536C1327.67 562.667 1308 576 1280 576H1024V1024C1024 1041.33 1017.67 1056.33 1005 1069C992.333 1081.67 977.333 1088 960 1088H704C686.667 1088 671.667 1081.67 659 1069C646.333 1056.33 640 1041.33 640 1024V576H384C356 576 336.333 562.667 325 536C313.667 510 318.333 487 339 467L787 19C799 6.33333 814 0 832 0C850 0 865 6.33333 877 19L1325 467C1345.67 487 1350.33 510 1339 536Z" fill="#255869"/>
            </svg>
            <p className={Styles.addFile}>{addButtonTitle ?? 'Add Photo'}</p>
            <div className={Styles.fileInfo}>
              <p>File Name:{state.fileName}</p>
              <p>File Size:{state.fileSize}</p>
            </div>
            <button className={Styles.btnSave} disabled={!state.fileName || state.error} onClick={(event: any) => {
              event.preventDefault()
              event.stopPropagation()
              dialogRef.current.close()
            }}>Save</button>
            <div className={Styles.wrapErrorMsg}>
              {state.error && <ErrorComponent className={Styles.error} text={state.error.message}/>}
            </div>
          </div>
        </dialog>
      </div>

    </div>
  )
}

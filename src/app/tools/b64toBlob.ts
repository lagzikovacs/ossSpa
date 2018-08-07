import {BlobContentType} from '../enums/blobcontentType';

export function b64toBlob(b64Data, contentType: BlobContentType) {
  const sliceSize = 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  switch (contentType) {
    case BlobContentType.Xls:
      return new Blob(byteArrays, {type: 'application/vnd.ms-excel'});
    default:
      throw new Error('Lekezeletlen BlobContentType!');
  }
}

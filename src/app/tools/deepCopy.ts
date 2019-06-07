export function deepCopy(obj) {
  // alternatíva1 Jquery const clone = $.extend(true, {}, sourceObject);
  // alternatíva2  JSON.parse(JSON.stringify(obj))

  let copy;

  // Ha az object, vagy propertyje null vagy nem object akkor térjen vissza az eredeti
  if (obj == null || typeof obj !== 'object' ) {
    return obj;
  }

  // Ha Dátum típusú az object vagy propertyje, akkor új dátum tér vissza
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Ha Array típusú az Object vagy propertyje akkor annak másolatával térjen vissza, rekurzíóban
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Ha obeject ténylegesen object akkor propokat rekuzívan másolja
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepCopy(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error('Az objektum nem másolható, vagy a típusa nem támogatott');
}

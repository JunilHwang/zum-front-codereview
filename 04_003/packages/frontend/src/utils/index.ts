type CustomObject = {
  [propsName: string]: any;
};

export const getUrlInfo = (() => {
  const pathRegex = /([\/[a-zA-Z0-9]*]*)(\?[\w\d=&]+)?/;

  const parseQuery: (queryString: string) => CustomObject = (
    queryString: string,
  ) => {
    const query: CustomObject = {};
    const queryDataArray = queryString.replace('?', '').split('&');
    queryDataArray.forEach(data => {
      const [key, value] = data.split('=');
      query[key] = value;
    });
    return query;
  };

  const parsePath = (pathString: string) => {
    let path, parameter;
    const pathArray = pathString.split('/');
    const parameterData = pathArray.pop();
    const pathData = pathArray.join('/');

    if (pathData.length === 0) {
      path = `/${parameterData}`;
      parameter = null;
    } else {
      path = pathData;
      parameter = parameterData;
    }

    return {
      path,
      parameter,
    };
  };
  return (url: string) => {
    const regexResult = pathRegex.exec(url) as RegExpExecArray;
    const pathString = regexResult[1];
    const path = parsePath(pathString);

    const queryString = regexResult[2];
    const query = queryString ? parseQuery(queryString) : null;
    return { ...path, query };
  };
})();

export const resolveStyleProps = (() => {
  const resolveStyleKey = (key: string) => {
    return Array.from(key)
      .map((char: string) => {
        if (char === char.toUpperCase()) {
          return `-${char.toLowerCase()}`;
        } else {
          return char;
        }
      })
      .join('');
  };

  return (styleStrings: string) => {
    const styles = JSON.parse(styleStrings);
    const styleKeys = Object.keys(styles);
    return styleKeys
      .map(key => `${resolveStyleKey(key)}:${styles[key]};`)
      .join(' ');
  };
})();

type DataObject = {
  [propsName: string]: any;
};

export const getRequest = async (url: string) => {
  try {
    const res = await fetch(url);

    switch (res.status) {
      case 200:
        const data = await res.json();
        return data;
      case 500:
        throw new Error('Internal Server Error');
    }
  } catch (err) {
    throw new Error(err as string);
  }
};

export const postRequest = async (url: string, payload: DataObject) => {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    switch (res.status) {
      case 201:
        const data = await res.json();
        return data;
      case 500:
        throw new Error('Internal Server Error');
    }
  } catch (err) {
    throw Error(err as string);
  }
};

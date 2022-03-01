export const EventManager = (() => {
  const eventMapper: {
    [event: string]: {
      className: string;
      handler: Function;
    }[];
  } = {};
  const registedHandler: { event: string; handler: any }[] = [];

  const addEventHandler = (
    className: string,
    event: string,
    handler: Function
  ) => {
    if (!eventMapper[event]) eventMapper[event] = [];
    if (eventMapper[event].some((v) => v.className === className))
      eventMapper[event] = eventMapper[event].filter(
        (v) => v.className !== className
      );
    eventMapper[event].push({ className, handler });
  };
  const regist = () => {
    registedHandler.forEach((v) => {
      document.removeEventListener(v.event, v.handler);
    });
    Object.keys(eventMapper).forEach((event) => {
      const eventHandler = (e: any) => {
        const candidates = eventMapper[event];
        const targets = candidates.filter(
          (candidate) =>
            e.target.classList.contains(candidate.className) ||
            e.target.closest(`.${candidate.className}`)
        );
        targets.forEach((target) => {
          target.handler(e);
        });
      };
      registedHandler.push({ event, handler: eventHandler });
      document.addEventListener(event, eventHandler);
    });
  };

  return { addEventHandler, regist };
})();

export default EventManager;

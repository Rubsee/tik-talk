export function MyDebounce(delay: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const initialMethod = descriptor.value;
    let timeout: any;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        initialMethod.apply(this, arguments);
      }, delay);
    };

    return descriptor;
  };
}

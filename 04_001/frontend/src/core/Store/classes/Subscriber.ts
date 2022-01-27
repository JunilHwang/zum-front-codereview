import Publisher from "./Publisher";

/**
 * [Subscriber]
 * - 컴포넌트내에서 생성함.
 * - Publisher와 데이터를 주고 받기 위해 사용
 */
class Subscriber {
  constructor(public func?: Function) {}

  /**
   * 🧚🏻 registerFunc
   * - publisher에 Subscriber의 func 등록  
   *  (특정 Publisher 구독)
   */
  registerFunc(publisher: Publisher): void {
    if (this.func) publisher.add(this.func);
  }

  /**
   * 🧚🏻 removeFunc
   * - publisher에 Subscriber의 func 제거  
   *  (특정 Publisher 구독 취소)
   */
  removeFunc(publisher: Publisher): void {
    if (this.func) publisher.remove(this.func);
  }
}

export default Subscriber;

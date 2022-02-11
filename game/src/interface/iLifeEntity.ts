export default interface iLifeEntity{
    life : number;

    getHurt(damage: number):void
    isStillALive():boolean
}
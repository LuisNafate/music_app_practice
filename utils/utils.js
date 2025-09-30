export default function (max){
    if(max !== 1){
        return Math.floor(Math.random() * (max))
    }
    
    return 0;
}
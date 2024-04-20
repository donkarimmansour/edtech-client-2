export class User{


private userId: number;
   
private userName:string|null;
private password:string;
    
private email:string;
  
    constructor(userId:number,userName:string|null,password:string,email:string){
        this.userId=userId;
        this.userName=userName;
        this.password=password;
        this.email=email;
      

    }
    setUserId(value: number) {
        this.userId = value;
      }
      setUserName(value: string|null) {
          this.userName = value;
        }
   public  getUserName():string|null {
     return this.userName ;
    }
    
}
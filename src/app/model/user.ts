export interface IUser {
    uid: string,
    name: string,
    email: string,
    isRole: boolean
}

export interface IProducts {
    productId: string
    productName: string,
    productDesc: string,
    productPrice: number | null,
    productCategory: string,
    productImgUrl: string,
}

export interface ICart{
    id: string,
    name:string,
    price: number,
    imageUrl: string,
    categoty: string
}

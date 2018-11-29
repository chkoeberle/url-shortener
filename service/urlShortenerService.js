const db = require('./persistenceService');
const URL = require('../model/url');
const shortUUID = require('short-uuid');
const translator  = shortUUID();

const createSlug = async (url) => {
    let slug = await db.getSlugForUrl(url);
    if(slug){
        return new URL(url, slug);
    }else{
        slug  = await generateSlug(url);
        const result = new URL(url, slug);
        await db.createUrlEntry(result);
        return result;
    }
};

const generateSlug = async () =>{
    let slug = '';
    do {
        //TODO implement a more efficient algorithm that also consider different length of given url
         slug = translator.new();
    }while(await db.slugExist(slug));
    return slug;
};

module.exports = {createSlug};
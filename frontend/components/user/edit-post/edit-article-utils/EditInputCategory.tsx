import { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { IoIosClose } from 'react-icons/io'
import { ArticleData, ArticleDataState } from '../EditArticle'

interface EditInputCategoryProps{
  articleDataState: ArticleDataState
  articleDefaultDataRef: React.MutableRefObject<ArticleData>
}
export default function EditInputCategory({
  articleDataState,
  articleDefaultDataRef

}: EditInputCategoryProps) {
  // hooks
  const [categoryTxt,setCategoryTxt] = useState<string>("")
  const [articleData,setArticleData] = articleDataState


  // useEffect(()=>{
  //   const { content, ...rest } = articleMetadata;
  //   window.localStorage.setItem("article-metadata",JSON.stringify(rest))
  // },[categoryTxt])

  const handleSetCategoryBtn = () => {
    setArticleData(prev=> ({
      ...prev,
      category:[...prev.category,categoryTxt]
    }));
  }

  const handleRemoveCategory = (indexToRemove: number) => {
    // Use filter to create a new array without the category to be removed
    const newcategory = articleData.category.filter((_, index: number) => index !== indexToRemove);
    
    setArticleData(prev=>({
      ...prev,
      category:newcategory
    }))
  };


  // render
  return (
    <div>
      <label htmlFor="edit-category" className='block'>category{articleData.category!==articleDefaultDataRef.current.category?<span className='text-gray-600'>*</span>:null}</label>
      <div className='flex'>
        <input 
          required
          type="text" 
          id="edit-category" 
          data-cy="edit-category"
          className='px-2 border bg-slate-50 focus:bg-white dark:dark-single-component' 
          value={categoryTxt}
          onChange={(e)=>setCategoryTxt(e.target.value)}
        />
        <button className='bg-neutral-100' onClick={handleSetCategoryBtn}><BsPlus/></button>
      </div>
      <div className='text-sm	flex flex-wrap' data-cy="category-container">
        {articleData.category.map((category,i: number) => {
          return (
            <div key={i} className='px-2 rounded-full flex'>
              {category}
              <button onClick={()=>handleRemoveCategory(i)}><IoIosClose/></button>
            </div>
          )
        })}

      </div>
    </div>
  )
}

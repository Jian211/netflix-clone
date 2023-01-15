import { motion } from 'framer-motion';
import { useState} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';


const SearchBox = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    cursor: pointer;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding :5px 10px;
  padding-left: 24px;
  z-index: 2;
  color: white;
  text-indent: 10px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${props => props.theme.white.lighter};
  border-radius: 5px;
`;


const SearchForm = () => {
    const [searchWord, setSearchWord] = useState<string>("");
    const [searchOpen, setSearchOpen] = useState(false);
    const history = useHistory();

    const toggleSearch = () => setSearchOpen(prev => !prev);
    const onChange = (e:React.FormEvent<HTMLInputElement> ) => {
        const { value } = e.currentTarget;
        setSearchWord(() => value)
    }
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchWord(() => "");
        history.push(`/search?word=${searchWord}`);
    }

    return (
    <SearchBox>
        <motion.svg
          onClick={toggleSearch}
          animate={{ x: searchOpen ? -200 : 0 }}
          transition={{ ease:"linear"}}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{y: "16px"}}
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </motion.svg>
        
        <form onSubmit={onSubmit}>
          <Input 
            animate={{ scaleX : searchOpen ? 1 : 0}}
            transition={{ ease:"linear"}}
            placeholder="みたい映画を検索" 
            value={searchWord}
            onChange={onChange}
          />
        </form>
       </SearchBox>
  )
}

export default SearchForm
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Input,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    HStack,
    Checkbox,
    CheckboxGroup,
  } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import {useSearchParams} from 'react-router-dom';

export default function FilterMensProduct({page}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef();
  
  const [priceRange, setPriceRange] = useState([0,5000]);
  const [searchParams,setSearchParams] = useSearchParams();

  const initialStateBrand =  searchParams.getAll("brand");
  const initialStateCategory =  searchParams.getAll("category");
  const initialStateMax =  searchParams.getAll("max");
  const initialStateMin =  searchParams.getAll("min");

  const [selectedCategory, setSelectedCategory] = useState(initialStateCategory||[]);
  const [selectedBrand, setSelectedBrand] = useState(initialStateBrand||[]);
  const [selectedMin, setSelectedMin] = useState(initialStateMin||Number);
  const [selectedMax, setSelectedMax] = useState(initialStateMax||Number);
  

  console.log(selectedMax,"max")
  console.log(selectedMin,"min")

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    setSelectedMax(priceRange[1])
    setSelectedMin(priceRange[0])
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory([...e]);
  };
  
  const handleBrandChange = (e) => {
    setSelectedBrand([...e]);
  };
  
  useEffect(()=>{
      let params ={
          brand:selectedBrand,
          category:selectedCategory,
          max:selectedMax,
          min:selectedMin,
          page:page
      }

      setSearchParams(params);

  },[selectedBrand,selectedCategory,selectedMax,selectedMin,page])



  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            
          <Accordion defaultIndex={[0,1,2,3]} allowMultiple>
              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Price  
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                  <RangeSlider
                      aria-label={['min', 'max']}
                      defaultValue={[priceRange[0]===0&&selectedMin.length===0?0:selectedMin,priceRange[1]===5000&&selectedMax.length===0?5000:selectedMax]}
                      min={0}
                      max={5000}
                      step={1}
                      onChange={handlePriceRangeChange}>
                      <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0}/>
                      <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <HStack>
                      <Input type='Number' value={priceRange[0]===0&&selectedMin.length===0?0:selectedMin} disabled color={'blackAlpha.900'}/> 
                      <BsDash/>
                      <Input type='Number' value={priceRange[1]===5000&&selectedMax.length===0?5000:selectedMax} disabled/> 
                  </HStack>
                  </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Product Category   
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                      <CheckboxGroup value={selectedCategory} onChange={handleCategoryChange}>
                          <Checkbox value="jeans">Jeans</Checkbox><br/>
                          <Checkbox value="track pants" >Track Pants</Checkbox><br/>
                          <Checkbox value="pants" >Pants</Checkbox><br/>
                          <Checkbox value="shirt" >Shirts</Checkbox><br/>
                          <Checkbox value="t-shirt" >T-Shirts</Checkbox><br/>
                          <Checkbox value="hoodies" >Hoodies</Checkbox><br/>
                      </CheckboxGroup>
                  </AccordionPanel>
              </AccordionItem>

             
              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Brand
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                      <CheckboxGroup value={selectedBrand} onChange={handleBrandChange}>
                          <Checkbox value="Koovs" checked={selectedBrand.includes("Koovs")}>Koovs</Checkbox><br/>
                          <Checkbox value="Nike" checked={selectedBrand.includes("Nike")}>Nike</Checkbox><br/>
                          <Checkbox value="5ive" checked={selectedBrand.includes("5ive")}>5ive</Checkbox><br/>
                          <Checkbox value="TheCoutourclub" checked={selectedBrand.includes("TheCoutourclub")}>The Coutour club</Checkbox><br/>
                      </CheckboxGroup>
                  </AccordionPanel>
              </AccordionItem>
              </Accordion>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

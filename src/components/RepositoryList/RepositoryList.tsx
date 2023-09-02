import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../../endpoints/endpoint";
import { IRepository } from "../../utils/types/types";
import format from 'date-fns/format';
import { Card, CardHeader, CardBody, Circle, Text, Heading, Flex, Badge } from '@chakra-ui/react'



export const RepositoryList = () => {
    const login = "vladyslav-zolotarov";
    const { data, loading, error } = useQuery<IRepository>(GET_REPOSITORIES, {
        variables: { login }
    })

    console.log('data', data)
    console.log('loading', loading)
    console.log('error', error)


    if (loading) return <Text>Loading...</Text>

    if (error) return <Text>Error - {error.message}</Text>

    return (
        <Flex direction="column" rowGap="20px">
            {data && data.user.repositories.edges.map(repository => {
                return (
                    <Card key={repository.node.id} size="sm" variant="outline" p="10px">
                        <CardHeader borderBottom="1px" borderColor="blackAlpha.100">
                            <Flex alignItems="center" gap="5px">
                                <Heading size="md">{repository.node.name}</Heading>
                                <Badge variant='outline' colorScheme='blackAlpha' borderRadius='20px' padding='1px 8px' color='black'>
                                    <Text fontSize="sm" textTransform="lowercase">{repository.node.visibility}</Text>
                                </Badge>
                            </Flex>
                            <Text fontSize="sm">{repository.node.description}</Text>
                        </CardHeader>
                        <CardBody>
                            <Flex gap="15px" mb="5px">
                                {repository.node.languages.edges.map(language => {
                                    return (
                                        <Flex gap="3px" alignItems="center" key={language.node.name}>
                                            <Circle size="10px" bg={language.node.color} />
                                            <Text fontSize="sm">{language.node.name}</Text>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                            <Text fontSize="sm">Updated on {format(new Date(`${repository.node.updatedAt}`), 'MMMM dd, yyyy')}</Text>
                        </CardBody>
                    </Card>)
            })}
            Repository
        </Flex>
    );
};